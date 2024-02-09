'use server';

const SECRET_KEY = process.env.LUMIPLAN_SECRET_KEY;

async function fetchToken() {
  const endpoint =
    'https://mountain.live/auth/realms/lumiserveur/protocol/openid-connect/token';
  const clientId = 'powdermountainweb';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${SECRET_KEY}`,
      next: {
        revalidate: 1800,
      },
    });

    if (res.ok) {
      return res.json();
    } else {
      console.error(`Failed to fetch token. Status: ${res.status}`);
      return { access_token: '' };
    }
  } catch (error) {
    console.error('Error while fetching token:', error);
    return { access_token: '' };
  }
}

export async function fetchWeather() {
  try {
    const token = await fetchToken();

    const res = await fetch(
      'https://api.mountain.live/mountain_secured/weather/2.0?country=en_US&daysNumber=4&weatherZone=915',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(`Failed to fetch weather data. Status: ${res.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error while fetching weather data:', error);
    return null;
  }
}

export async function fetchSnowReport() {
  try {
    const token = await fetchToken();

    const res = await fetch(
      'https://api.mountain.live/mountain_secured/snow/1.0?country=en_US&snowZone=919',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(`Failed to fetch Snow Data. Status: ${res.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error while fetching snow report:', error);
    return null;
  }
}

export async function fetchPOI() {
  try {
    const token = await fetchToken();
    const res = await fetch(
      'https://api.mountain.live/mountain_secured/poi/2.0?operating=all&resort=894',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(`Failed to fetch POI data. Status: ${res.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error while fetching POI Data:', error);
    return null;
  }
}

export async function fetchPOIOverall() {
  try {
    const token = await fetchToken();

    const res = await fetch(
      'https://api.mountain.live/mountain_secured/poi-overall/2.0?country=en_US&resort=894',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(
        `Failed to fetch POI Overall Status. Status: ${res.status}`
      );
      return null;
    }
  } catch (error) {
    console.error('Error while fetching POI overall data:', error);
    return null;
  }
}

export async function fetchResortOpeningService() {
  try {
    const token = await fetchToken();

    const res = await fetch(
      'https://api.mountain.live/mountain_secured/resort-opening/1.0?country=en_US&resort=894',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(
        `Failed to fetch Resort Opening Service Data. Status: ${res.status}`
      );
      return null;
    }
  } catch (error) {
    console.error('Error while fetching Resort Opening Service Data:', error);
    return null;
  }
}

export async function fetchResortAccessService() {
  try {
    const token = await fetchToken();

    const res = await fetch(
      'https://api.mountain.live/mountain_secured/resort-access/1.0?country=en_US&resort=894',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(
        `Failed to fetch Resort Access Service. Status: ${res.status}`
      );
      return null;
    }
  } catch (error) {
    console.error('Error while fetching Resort Access Service:', error);
    return null;
  }
}

export async function fetchWebcamService() {
  try {
    const token = await fetchToken();

    const res = await fetch(
      'https://api.mountain.live/mountain_secured/resort-webcam/1.0?country=en_US&resort=894',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      console.error(`Failed to fetch Webcam Service. Status: ${res.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error while fetching Webcam Service:', error);
    return null;
  }
}
