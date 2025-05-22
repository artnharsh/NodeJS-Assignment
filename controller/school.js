const school = require("../model/schoolModel");

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  // Convert latitude and longitude to numbers
  const latNum = parseFloat(latitude);
  const lonNum = parseFloat(longitude);

  if (!name || !address || isNaN(latNum) || isNaN(lonNum)) {
    return res.status(400).json({ error: "Valid name, address, latitude and longitude are required." });
  }

  try {
    await school.insertSchool(name, address, latNum, lonNum);
    res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listSchools(req, res) {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Valid latitude and longitude required." });
  }

  try {
    const [schools] = await school.getAllSchools();
    const sorted = schools
      .map(school => ({
        ...school,
        distance: getDistance(userLat, userLon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addSchool,
  listSchools
};
