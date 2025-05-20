// Import axios using ES modules syntax
import axios from 'axios';

const randommerHeaders = { 
  'X-Api-Key': '854d31ec49c34bc38031a938df5152a3', 
  'Cookie': '.AspNetCore.Antiforgery.VyLW6ORzMgk=CfDJ8Am9rGyiR_1GtOY69quO2B_5ep8ZZnehpvYZMgjiupv8_AURymgCiw2h2moYTkBcvuOKSmyejGzgIgzRIWcNrixIXsMAkNPCzZ0Sc4AtsPH3JB-4DnfgtH2Ij3ws8r1_zNxjYfsDHbwi8efmeDHAgys'
};

async function makeApiCall(url, headers = {}) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: headers
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'appel à ${url}:`, error.message);
    return null;
  }
}

async function runPipeline() {
  console.log("Démarrage");
  
  const combinedData = {
    user: {},
    bankInfo: {},
    petInfo: {}
  };

  console.log("Récupération utilisateur");
  const userData = await makeApiCall('https://randomuser.me/api/?results=1');
  if (userData && userData.results && userData.results.length > 0) {
    const user = userData.results[0];
    combinedData.user = {
      gender: user.gender,
      name: {
        first: user.name.first,
        last: user.name.last
      },
      email: user.email,
      picture: user.picture.large,
      location: {
        street: `${user.location.street.number} ${user.location.street.name}`,
        city: user.location.city,
        country: user.location.country,
        postcode: user.location.postcode
      }
    };
  }
  
  console.log("Récupération numéro de tél");
  const phoneData = await makeApiCall('https://randommer.io/api/Phone/Generate?CountryCode=FR&Quantity=1', randommerHeaders);
  if (phoneData && phoneData.length > 0) {
    combinedData.user.phone = phoneData[0];
  }
  
  console.log("Récupération IBAN");
  const ibanData = await makeApiCall('https://randommer.io/api/Finance/Iban/FR', randommerHeaders);
  if (ibanData) {
    combinedData.bankInfo.iban = ibanData;
  }

  console.log("Récupération card");
  const cardData = await makeApiCall('https://randommer.io/api/Card?type=VISA', randommerHeaders);
  if (cardData) {
    combinedData.bankInfo.card = {
      number: cardData.cardNumber,
      cvv: cardData.cvv,
      expiration: cardData.expiryDate
    };
  }

  console.log("Récupération prenom");
  const nameData = await makeApiCall('https://randommer.io/api/Name?nameType=firstname&quantity=1', randommerHeaders);
  if (nameData && nameData.length > 0) {
    combinedData.petInfo.name = nameData[0];
  }
  
  console.log("Terminé");
  
  console.log("Données generées");
  console.log(JSON.stringify(combinedData, null, 2));
  
  return combinedData;
}

runPipeline();

export { runPipeline, makeApiCall };