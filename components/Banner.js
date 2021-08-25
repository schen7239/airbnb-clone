import Image from 'next/image';
function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[650px]">
            <Image 
             src="https://links.papareact.com/0fm"
             layout="fill"
             objectFit="cover"
            />
            <div className="absolute top-1/2 w-full text-center text-sm sm:text-lg">
                <p>Not sure where to go? Perfect.</p>
                <button className="font-bold m-3 rounded-full text-purple-500 bg-white px-10 py-4 shadow-md hover:shadow-lg active:scale-90 transition duration-150 ease-out">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
