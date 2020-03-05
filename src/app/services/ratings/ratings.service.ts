import { Injectable } from '@angular/core';

@Injectable()
export class RatingsService{



public ratingCategories:any={
  "Water Closets(WC)":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Lavatory Faucet":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Urinal":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Showerhead":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Kitchen Faucet":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Cement":["Environmetal Product Declaration","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Glazing - External":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Glazing - Internal":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Ceiling tiles (mineralfibre/gypsum)":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Flooring - tile":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Flooring - carpet":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Bio-based material","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Flooring - Other":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Insulation": ["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Insulation - ducts": ["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Tables - Workstation":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","ANSI/BIFMA e3 Furniture Sustainability","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Tables - Cabin":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","ANSI/BIFMA e3 Furniture Sustainability","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Tables - Others":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","ANSI/BIFMA e3 Furniture Sustainability","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Chairs":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","ANSI/BIFMA e3 Furniture Sustainability","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Seating - Other":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","ANSI/BIFMA e3 Furniture Sustainability","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Laminate":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Paint (internal)":["Environmetal Product Declaration","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Adhesive":["Environmetal Product Declaration","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Particleboard":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Bio-based material","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Plywood board":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Bio-based material","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Wood":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Bio-based material","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Gypsumboard":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Wallpaper":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Door Hinges":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Door Handles":["Environmetal Product Declaration","Extended producer responsibility","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Pin-up board":["Environmetal Product Declaration","Extended producer responsibility","FSC certified Wood","Recycled Content","Health Product Declaration","Cradle to Cradle","Reach Complaint","Declare","Cradle to Cradle Material Health Certification","Product Lens Certification"],
  "Green Vehicles":["Green Vehicles"],
  "Electrical Vehicle Supply Equipment (EVSE)":["Electrical Vehicle Supply Equipment (EVSE)"],
  "Roof Paint/Coatings/Tiles":["Solar Reflective Index"],
  "Pavers":["Solar Reflectance"],
  "Exterior Luminaires":["Exterior Luminaires"]
};



public thresholds={
  "Kitchen Faucet flow rate - lpm/gpm at 60 Psi/415 kPa":{
    lsGPM:1.76, //lessthan => ls
    lsLPM:6.64
  },
  "WC flush rate - lpf/gpf":{
    lsGPM:1.28, // lessthan => ls
  },
  "Solar Reflectance (SR) - three-year aged":{'BD+C':-0.28, EBOM:0.32},
  "Solar Reflectance (SR) - Initial":{'BD+C':0.33, EBOM:0.39},
  "Solar Reflective index (SRI) - three-year aged":{LSR:64,HSR:32},
  "Solar Reflective index (SRI) - Initial":{LSR:82,HSR:39}


}



public parametersExplorer={

      "Environmetal Product Declaration": {
          "subMenu1":[ "Product-specific declaration","Industry-wide (generic) EPD","Product-specific Type III EPD"],

          "subMenu2": ["Global Warming Potential (in CO2e)","Eutrophication (in kg nitrogen or kg phosphate)",
                    "Depletion of the stratospheric ozone layer (in kg CFC-11)",
                    "Formation of tropospheric ozone (in kg NOx, kg O3 eq, or kg ethene)",
                     "Acidification of land and water sources (in moles H+ or kg SO2)",
                     "Depletion of nonrenewable energy resources ( in MJ)"],

          "code":["MR02"],
          "entryField":["Value for Product-specific declaration","Value for Industry-wide (generic) EPD","Product-specific Type III EPD"],
          "label":["LCA","EPD"],
          "requirements":[]
         },

      "Extended producer responsibility":{
          "subMenu1":[],
          "subMenu2":[],
          "code":["MR01"],
          "label":["Ext. Producer Responsibility"],
          "requirements":[]
      },

      "Bio-based material": {
           "subMenu1":[],
           "subMenu2":[],
           "code":["MR05"],
           "requirements":["Sustainable Agriculture Network’s Sustainable Agriculture Standard Bio-based raw materials","Legally harvested","Tested using ASTM Test Method D6866"]
      },

      "FSC certified Wood": {
           "subMenu1":[],
           "subMenu2":[],
           "code":["MR03"],
           "label":["FSC"],
           "requirements":[]
      },

    "Recycled Content": {
            "subMenu1":[],
            "subMenu2": ["Post-Consumer", "Pre-Consumer"],
            "entryField": ["Value for Post-Consumer","Value for Pre-Consumer"],
            "code":["MR04"],
            "label":["Recycled Content"],
            "requirements":[]
    },

    "Health Product Declaration": {
            "subMenu1": ["100 ppm","1000 ppm"],
            "subMenu2":[],
            "code":["MR06"],
            "label":["HPD"],
            "entryField":["Value for 100ppm","Value for 1000ppm"],
            "requirements":["Disclosure to at least 100 ppm","Disclosure to at least 1000 ppm"]

    },

    "Cradle to Cradle": {
        "subMenu1": [ "Ver 2 - Basic / Ver 3: Bronze", "Ver 2: Gold/Platinum OR Ver 3: Silver/Gold/Platinum" ],
        "subMenu2":[],
        "entryField": [ "Value for Ver 2 - Basic / Ver 3: Bronze","Value for Ver 2: Gold/Platinum OR Ver 3: Silver/Gold/Platinum"],
        "code":["MR07"],
        "label":["C2C"],
        "requirements":[]
        },

    "Cradle to Cradle Material Health Certification": {
      "subMenu1": [],
      "subMenu2":[],
      "code":["MR11"],
      "label":["C2C MHC"],
      "requirements":["Certified at Bronze level of higher, at least 90% of materials assessed by weight"]
    },

    "Reach Complaint": {
        "subMenu1": [],
        "subMenu2":[],
        "code":["MR08"],
        "requirements":["Disclosure to at least 100 ppm"],
        "label":["REACH"]
    },

    "Declare": {
        "subMenu1": [],
        "subMenu2": [],
        "code":["MR10"],
        "requirements":["Disclosure to at least 1000 ppm"],
        "label":["Declare"]
    },

    "ANSI/BIFMA e3 Furniture Sustainability": {
      "subMenu1": ["e3-2012","e3-2014"],
      "subMenu2": [],
      "entryField": ["Value for e3-2012","Value for e3-2014"],
      "code":["MR09"],
      "label":["ANSI/BIFMA"],
      "requirements":["Threshold:Minimum 3 points in 7.5.1.3 Advanced Level (e3-2012)","Threshold:Minimum 3 points in 7.4.1.3 Advanced Level (e3-2014)"]
    },

   "Product Lens Certification": {
      "subMenu1": [],
      "subMenu2": [],
      "code":["MR12"],
      "label":["Product Lens"],
      "requirements":["Disclosure to at least 1000 ppm"]
    },

    "Green Vehicles":{
      "subMenu1": ["ACEEE Score","Euro 6 limit Regulation (EC) No. 715/2007","IBAMA & INMETRO"],
      "subMenu2":[],
      "entryField": ["Value for ACEEE Score","Value for Euro 6 limit Regulation (EC) No. 715/2007","Value for IBAMA & INMETRO"],
      "code":["LT01"],
      "label":["Green Vehicles"],
      "requirements":["ACEEE Score >=45","Complince with Euro 6 limit Regulation (EC) No. 715/2007","IBAMA >= 4 stars & A label from INMETRO"]
    },

    "Electrical Vehicle Supply Equipment (EVSE)":{
      "subMenu1": ["SAE Surface Vehicle Recommended Practice J1772","SAE Electric Vehicle Conductive Charge Coupler","IEC 62196 of the International Electrotechnical Commission"],
      "subMenu2":[],
      "entryField": ["Value for ACEEE Score","Value for Euro 6 limit Regulation (EC) No. 715/2007","Value for IBAMA &  INMETRO"],
      "code":["LT02"],
      "label":["Electrical Vehicle Supply Equipment (EVSE)"],
      "requirements":["Level 2 charging (208 – 240 volts) or greater, *Internet Addressable/Networked for Demand Response"]
    },

    "Solar Reflectance":{
      "subMenu1": ["Solar Reflectance (SR)-three-year aged","Solar Reflectance (SR) - Initial"],
      "subMenu2":[],
      "entryField": ["Value for Solar Reflectance (SR)-three-year aged","Value for Solar Reflectance (SR) - Initial"],
      "code":["SS01"],
      "label":["SR"],
      "requirements":["Solar Reflectance (SR): three-year aged - 0.28 for BD+C/0.32 for EBOM " , "Solar Reflectance (SR): Initial - 0.33 for BD+C/0.39 for EBOM" ]
    },

    "Solar Reflective Index":{
      "subMenu1": ["Solar Reflective index (SRI) - three-year aged","Solar Reflective index (SRI) - Initial"],
      "subMenu2":[],
      "entryField": ["Value for Solar Reflective index (SRI) - three-year aged","Value for Solar Reflective index (SRI) - Initial"],
      "code":["SS01"],
      "label":["SRI"],
      "requirements":["Solar Reflective index (SRI): three-year aged - 64 (Low sloped roof), 32 (High sloped roof);","Solar Reflective index (SRI): Initial  - 82 (Low sloped roof), 39 (High sloped roof)"]
    },

    "Exterior Luminaires":{
      "subMenu1": ["BUG rating"],
      "subMenu2":["Backlight rating","Uplight Rating","Glare Rating"],
      "entryField": ["Value for BUG rating"],
      "code":["SS03"],
      "label":["BUG rating"],
      "requirements":[]
    }
};

}
