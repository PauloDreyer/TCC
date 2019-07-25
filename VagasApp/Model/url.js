const urls = {
    cep: "https://viacep.com.br/ws/%/json/",
    findPlace: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=",
    localizacao: "https://maps.googleapis.com/maps/api/geocode/json?address=",
    estados: "http://api.londrinaweb.com.br/PUC/Estados/BR/0/10000",
    cidades: "http://api.londrinaweb.com.br/PUC/Cidades/%/BR/0/10000",
    apykey:"&key=AIzaSyDb1EuPoLYkMyLPIPEmrinT6-4-pmRyRyY",
    inputtype: "&inputtype=textquery",
    language: "&language=&pt-BR",
    fields: "&fields=opening_hours,icon,geometry",
    directions: "https://maps.googleapis.com/maps/api/directions/json?",
    origin: "origin=",
    destination: "&destination=",
  };

export default urls;