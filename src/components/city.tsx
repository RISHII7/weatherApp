import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";

import { Alert, AlertDescription } from "./ui/alert";

import WeatherSkeleton from "./skeleton";
import { CurrentWeather } from "./current-weather";
import WeatherForecast from "./five-day-forecast";

const City = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    const coordinates = { lat, lon };

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                    Failed to load weather data. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {params.cityName}, {weatherQuery.data.sys.country}
                </h1>
            </div>

            {/* Responsive Layout for CurrentWeather and WeatherForecast */}
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {/* Current Weather */}
                <div>
                    <CurrentWeather data={weatherQuery.data} />
                </div>

                {/* Weather Forecast */}
                <div>
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
}

export default City;
