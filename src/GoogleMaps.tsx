import { google, Loader } from 'google-maps';
import React from 'react';

interface GoogleMapsContextProps {
  google?: google;
}

const GoogleMapsContext = React.createContext<GoogleMapsContextProps>({});

export const useGoogleMaps = (): GoogleMapsContextProps => React.useContext(GoogleMapsContext);

export interface GoogleMapsProviderProps {
  apiKey: string;
  libraries: string[];
}

export const GoogleMapsProvider: React.FunctionComponent<GoogleMapsProviderProps> = ({
  apiKey,
  libraries,
  children,
}) => {
  const [google, setGoogle] = React.useState<google>();

  React.useEffect(() => {
    if (!!google) {
      return;
    }

    const loader = new Loader(apiKey, { libraries });
    loader.load().then(setGoogle);
  }, [google, apiKey, libraries]);

  return (
    <GoogleMapsContext.Provider value={{ google }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const geolocate = (
  google: google,
  autocomplete: google.maps.places.Autocomplete
): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy,
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
};
