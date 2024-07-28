import { useEffect, useState } from "react";

function handleScroll(setLoadPage) {
    if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight
    ) {
        //console.log("Hi");
        setLoadPage((prev) => prev + 1);
    }
}

export function useInfiniteScroll() {
    const [loadPage, setLoadPage] = useState(1);

    useEffect(() => {
        const handleInfiniteScroll = () => handleScroll(setLoadPage);

        window.addEventListener("scroll", handleInfiniteScroll);
        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, []);

    return { loadPage };
}
