﻿namespace LocalGoods.Main.Model.BussinessModels
{
    public class AddressChangeRequest
    {
     
        public string PinCode { get; set; }
        
        public string Country { get; set; }
        
        public string City { get; set; }
       
        public string Area { get; set; }

        public string? Cordinates { get; set; }
    }
}
