import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {format} from "date-fns"
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({searchResults}) {
    const router = useRouter();
    const { location, startDate, endDate, numberOfGuests } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    return (
        <div>
            <Header placeholder={`${location} | ${dateRange} | ${numberOfGuests} Guests`}/>
            <main className="flex" >
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs ">300+ Stays - {dateRange} - for {numberOfGuests} guests</p>
                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Type of Place</p>
                    <p className="button">Price</p>
                    <p className="button">Rooms and Beds</p>
                    <p className="button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                     {searchResults.map(item => (
                         <InfoCard img={item.img}
                         title={item.title}
                         description={item.description}
                         star={item.star}
                         price={item.price}
                         key={item.img}
                         total={item.total}
                         location={item.location}
                         />
                     ))}   
                    </div>
            </section>
            <section className="hidden xl:inline-flex xl:min-w-[500px]">
                <Map searchResults={searchResults}/>
            </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz').then(res => res.json());
    return{
        props: {
            searchResults
        }
    }
}