import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

import { useGeoLocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeoCodeQuery, useWeatherQuery } from "@/hooks/use-weather";

import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

import WeatherSkeleton from "./skeleton";
import { CurrentWeather } from "./current-weather";
import WeatherForecast from "./five-day-forecast";

const Dashboard = () => {
  const { isLoading, error, coordinates, getLocation } = useGeoLocation();
  
  // Queries for weather, forecast, and location
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeoCodeQuery(coordinates);

  // Refresh logic for location and data
  const handleRefresh = async () => {
    await getLocation();  // Refresh location
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (isLoading || weatherQuery.isLoading || forecastQuery.isLoading || locationQuery.isLoading) {
    return <WeatherSkeleton />;
  }

  // Handle errors for location, weather, and forecast
  if (error || weatherQuery.error || forecastQuery.error || locationQuery.error) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>{error || "Error"}</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>{error || "Failed to fetch data. Please try again."}</p>
            <Button onClick={handleRefresh} variant="outline" className="w-fit">
              <RefreshCw className="mr-2 w-4 h-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Check for coordinates availability and request location if not available
  if (!coordinates) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Alert variant="destructive">
          <AlertTitle>Location Required</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>Please enable your location access to see your local weather.</p>
            <Button onClick={getLocation} variant="outline" className="w-fit">
              <MapPin className="mr-2 w-4 h-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Check if the data is available for weather and forecast
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  const locationName = locationQuery.data?.[0];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Current Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="my-4 grid gap-6 lg:grid-cols-2">
        {/* Current Weather */}
        <div>
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
        </div>

        {/* Weather Forecast */}
        <div>
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
