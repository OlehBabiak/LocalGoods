﻿using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "customer")]
    public class HomeController : ControllerBase
    {
        private readonly LocalGoodsDbContext _dbContext;
        private readonly UserService _userService;

        public HomeController(LocalGoodsDbContext dbContext, UserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProductList()
        {
            var response = new ResponseModel();
            var products = await _dbContext.Product.Where(x => x.IsPublished && x.IsAvailable ).Select(y => y).ToListAsync();
            if (products == null)
            {
                response.Status = false;
                response.Message = "No product available for sale";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }

            var user = _userService.CurrentUser();
            List<Product> nearByProduct = new List<Product>();
            if (user.Address != null)
            {
                nearByProduct = products.Where(x => x.Seller.Address.City == user.Address.City).ToList();
            }
                var otherProducts = products.Except(nearByProduct).ToList();
                response.Status = true;
                response.Message = "Products found";
                response.Data = new { nearByProduct, otherProducts };
                return Ok(response);
             
        }
        [HttpGet("GetProductById/{id:int}")]
        public async Task<IActionResult> GetProduct(int id)
        {

            var response = new ResponseModel();

            var product = await _dbContext.Product.Where(x => x.Id == id).Select(y => y).FirstOrDefaultAsync();
            if (product == null)
            {
                response.Status = false;
                response.Message = "Product not found";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            response.Status = true;
            response.Message = "Product found";
            
            response.Data = product;
            return Ok(response);
        }
        [HttpGet("Sellers")]

        public async Task<ActionResult> GetSellers()
        {
            var Sellerlist = await _dbContext.User.Where(x => x.Role == Role.Seller).ToListAsync();
            if (Sellerlist == null || Sellerlist.Count == 0)
            {
                return Ok(new ResponseModel
                {
                    Status = false,
                    Message = "No seller Found"

                });
            }

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Sellers Found",
                Data = Sellerlist
            });

        }

        [HttpGet("RateSeller")]
        public async Task<ActionResult> RateSeller(int id, int rating)
        {

            var user = _userService.CurrentUser();
            var seller = await _dbContext.User.Where(x => x.Id == id).Select(a => a).FirstOrDefaultAsync();
            if (seller == null)
            {
                return NotFound(new ResponseModel
                {
                    Status = false,
                    Message = "Seller not found"
                });
            }
            if (rating < 1 || rating > 5)
            {
                return BadRequest(new ResponseModel
                {
                    Status = false,
                    Message = "Rating should be between 1 to 5"
                });
            }
            var ratingModel = new Rating
            {
                CustomerId = user.Id,
                SellerId = seller.Id,
                Stars = rating
            };
            await _dbContext.Rating.AddAsync(ratingModel);
            var average = _dbContext.Rating.Where(x => x.SellerId == seller.Id).Select(a => a.Stars).Average();
            seller.SellerRating = average;
            _dbContext.User.Update(seller);
            await _dbContext.SaveChangesAsync();

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Seller rated successfully",
                Data = seller

            });
        }

    }

}

