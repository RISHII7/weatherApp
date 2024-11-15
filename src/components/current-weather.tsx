import { useState } from "react";
import { Droplets, Wind } from "lucide-react";

import type { WeatherData, GeocodingResponse } from "@/lib/types";

import { Card, CardContent } from "@/components/ui/card";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
    const [unit, setUnit] = useState<'C' | 'F'>('C'); // 'C' for Celsius, 'F' for Fahrenheit

    const {
        weather: [currentWeather],
        main: { temp, humidity },
        wind: { speed },
    } = data;

    // Function to convert Celsius to Fahrenheit
    const celsiusToFahrenheit = (temp: number) => (temp * 9/5) + 32;

    // Function to format temperature based on the selected unit
    const formatTemp = (temp: number) => {
        if (unit === 'F') {
            return `${Math.round(celsiusToFahrenheit(temp))}°F`;
        }
        return `${Math.round(temp)}°C`;
    };

    // Toggle temperature unit when clicked
    const handleTempClick = () => {
        setUnit(unit === 'C' ? 'F' : 'C');
    };

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end gap-1">
                                <h2 className="text-2xl font-bold tracking-tighter">
                                    {locationName?.name}
                                </h2>
                                {locationName?.state && (
                                    <span className="text-muted-foreground">
                                        , {locationName.state}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {locationName?.country}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p
                                className="text-7xl font-bold tracking-tighter cursor-pointer"
                                onClick={handleTempClick}
                            >
                                {formatTemp(temp)}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Humidity</p>
                                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Wind Speed</p>
                                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                                alt={currentWeather.description}
                                className="h-full w-full object-contain"
                            />
                            <div className="absolute bottom-0 text-center">
                                <p className="text-sm font-medium capitalize">
                                    {currentWeather.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
