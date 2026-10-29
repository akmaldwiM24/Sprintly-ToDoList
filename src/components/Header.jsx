import "./Header.css"

const currentDate = new Date().toLocaleDateString(
    "en-US",
    {
        month: "long",
        day: "numeric",
        year: "numeric"
    }
);

function Header({ searchQuery, onSearchChange }){
    return(
        <header className="header">
            <div className="header-welcome">
                <h2>Welcome Back, Boskuh!</h2>
                <p>{currentDate}</p>
            </div>

            <div className="header-action">
                <input type="search"
                    placeholder="Search tasks..."
                    aria-label="Search tasks"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)} />
                
            </div>
        </header>
    );

}

export default Header;