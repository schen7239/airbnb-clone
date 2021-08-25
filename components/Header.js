import Image from "next/image";
import { SearchIcon, GlobeAltIcon, UserCircleIcon, UsersIcon, MenuIcon } from "@heroicons/react/solid"
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";

 
function Header({placeholder}) {
    const [searchInput, setSearchInput]= useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuests, setNumberOfGuests]=useState(1);
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }
    const resetInput = () => {
        setSearchInput('');
    } 
    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(), 
                numberOfGuests
            }
        });
    }
    const router = useRouter();
    return (

        <header className="sticky grid grid-cols-3 p-5 bg-white shadow-md z-50 md:px-10">
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image 
                onClick = {()=>router.push('/')}
                src="https://links.papareact.com/qd3"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>
            <div className="md:border-2 flex items-align rounded-full py-2 md:shadow-sm">
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}className="flex-grow pl-5 bg-transparent outline-none" placeholder={placeholder || "Start your search"} type="text " />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>
            <div className="flex items-center space-x-5 justify-end text-gray-500">
                <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 text-gray-500 cursor-pointer"  />
                <div className="flex border-2 rounded-full space-x-2 p-2">
                <MenuIcon className="h-6 cursor-pointer" />
                <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto top-2">
                <DateRangePicker 
                minDate={new Date()}
                rangeColors={["#FD5B61"]}
                ranges={[selectionRange]}
                onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4">
                    <h2 className="text-2xl font-semibold flex-grow ">Number of Guests</h2>
                    <UsersIcon className="h-5" />
                    <input value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} type="number" className="w-12 pl-2 text-lg outline-none text-red-400" min={1} />
                </div>
                <div className="flex justify-around">
                    <button onClick={resetInput} className="text-gray-500">Cancel</button>
                    <button className="text-red-400" onClick={search}>Search</button>
                </div>
                </div>
            )}
        </header>
    )
}

export default Header
