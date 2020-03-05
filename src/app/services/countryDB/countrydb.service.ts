import { Injectable } from '@angular/core';

@Injectable()
export class CountryDbService{

  public regions:any=['AFRICA','LATIN AMERICA AND THE CARIBBEAN','NORTHERN AMERICA','ASIA','EUROPE','OCEANIA'];
  public subRegion:any={
    'Region':['Sub Region'],
    'AFRICA':['Eastern Africa','Middle Africa','Northern Africa','Southern Africa','Western Africa'],
    'LATIN AMERICA AND THE CARIBBEAN' :['Caribbean','Central America','South America'],
    'NORTHERN AMERICA':['NORTHERN AMERICA'],
    'ASIA':['Central Asia','Eastern Asia','Southern Asia','South-Eastern Asia','Western Asia'],
    'EUROPE':['Eastern Europe','Northern Europe','Southern Europe','Western Europe'],
    'OCEANIA':['Australia and New Zealand','Melanesia','Micronesia','Polynesia']
  };

  public countries:any={
    'Region':{ 'Sub Region':['Country'] },
    'AFRICA':{
      'Eastern Africa':["Burundi","Comoros","Djibouti","Eritrea","Ethiopia","Kenya","Madagascar","Malawi","Mauritius","Mayotte","Mozambique","Reunion","Rwanda","Seychelles","Somalia","South","Sudan","Uganda","United","Republic","of","Tanzania","Zambia","Zimbabwe"],
      'Middle Africa':["Angola","Cameroon","Central African Republic","Chad","Congo","Democratic Republic of the Congo","Equatorial Guinea","Gabon","Sao Tome and Principe"],
      'Northern Africa':["Algeria","Egypt","Libya","Morocco","Sudan","Tunisia","Western Sahara"],
      'Southern Africa':["Botswana","Lesotho","Namibia","South Africa","Swaziland"],
      'Western Africa':["Benin","Burkina Faso","Cabo Verde","Cote d'Ivoire","Gambia","Ghana","Guinea","Guinea-Bissau","Liberia","Mali","Mauritania","Niger","Nigeria","Saint Helena","Senegal","Sierra Leone","Togo"]


    },
    'LATIN AMERICA AND THE CARIBBEAN':{
      'Caribbean':["Anguilla","Antigua and Barbuda","Aruba","Bahamas","Barbados","Bonaire","Sint Eustatius and Saba","British Virgin Islands","Cayman Islands","Cuba","Curaçao","Dominica","Dominican Republic","Grenada","Guadeloupe","Haiti","Jamaica","Martinique","Montserrat","Puerto Rico","Saint-Barthélemy","Saint Kitts and Nevis","Saint Lucia",
                   "Saint Martin (French part)","Saint Vincent and the Grenadines","Saint Maarten (Dutch part)","Trinidad and Tobago","Turks and Caicos Islands","United States Virgin Islands"],
      'Central America':["Belize","Costa Rica","El Salvador","Guatemala","Honduras","Mexico","Nicaragua","Panama"],
      'South America':["Argentina","Bolivia ","Brazil","Chile","Colombia","Ecuador","Falkland Islands (Malvinas)","French Guiana","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela"]
    },
    'NORTHERN AMERICA':{
      'NORTHERN AMERICA':["Bermuda","Canada","Greenland","Saint Pierre and Miquelon","United States of America"]
    },
    'ASIA':{
      'Central Asia':["Kazakhstan","Kyrgyzstan","Tajikistan","Turkmenistan","Uzbekistan"],
      'Eastern Asia':["China","Hong Kong Special Administrative Region","Macao Special Administrative Region","Democratic People's Republic of Korea","Japan","Mongolia","Republic of Korea"],
      'Southern Asia':["Afghanistan","Bangladesh","Bhutan","India","Iran (Islamic Republic of)","Maldives","Nepal","Pakistan","Sri Lanka"],
      'South-Eastern Asia':["Brunei Darussalam","Cambodia","Indonesia","Lao People's Democratic Republic","Malaysia","Myanmar","Philippines","Singapore","Thailand","Timor-Leste","Vietnam"],
      'Western Asia':[ "Armenia","Azerbaijan","Bahrain","Cyprus","Georgia","Iraq","Israel","Jordan","Kuwait","Lebanon","Oman","Qatar","Saudi Arabia","State of Palestine","Syrian Arab Republic","Turkey","United Arab Emirates","Yemen"]

    },
    'EUROPE':{
      'Eastern Europe':["Belarus","Bulgaria","Czech Republic","Hungary","Poland","Republic of Moldova","Romania","Russian Federation","Slovakia","Ukraine"],
      'Northern Europe':["Åland Islands","Channel Islands","Denmark","Estonia","Faeroe Islands","Finland","Guernsey","Iceland","Ireland","Isle of Man","Jersey","Latvia","Lithuania","Norway","Sark","Svalbard and Jan","Sweden","United of Great Britain and Northern Ireland"],
      'Southern Europe':["Albania","Andorra","Bosnia and Herzegovina","Croatia","Gibraltar","Greece","Holy See","Italy","Malta","Montenegro","Portugal","San Marino","Serbia","Slovenia","Spain","The former Yugoslav Republic of Macedonia"],
      'Western Europe':["Austria","Belgium","France","Germany","Liechtenstein","Luxembourg","Monaco","Netherlands","Switzerland"]
    },
    'OCEANIA':{
      'Australia and New Zealand':["Australia","New Zealand","Norfolk Island"],
      'Melanesia':["Fiji","New Caledonia","Papua New Guinea","Solomon Islands","Vanuatu"],
      'Micronesia':["Guam","Kiribati","Marshall Islands","Micronesia (Federated States of)","Nauru","Northern Mariana Islands","Palau"],
      'Polynesia':["American Samoa","Cook Islands","French Polynesia","Niue","Pitcairn","Samoa","Tokelau","Tonga","Tuvalu","Wallis and Futuna Islands"]
    }

  }
}
