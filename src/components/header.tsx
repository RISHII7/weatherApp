import { Link } from "react-router-dom";
import SearchCity from "./search-city";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to={"/"}>
                    <div>
                        Weather App
                    </div>
                </Link>

                <div className="flex gap-4">
                    <SearchCity />
                </div>
            </div>
        </header>
    );
};
export default Header