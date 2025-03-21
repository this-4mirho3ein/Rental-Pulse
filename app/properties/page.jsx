import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/model/Property';


const PropertiesPage = async () => {
    await connectDB();
    const properties = await Property.find({}).lean()
    return ( 
        <section className='px-4 py-6'>
            <div className='container-x; lg:container m-auto px-4 py-6'>
                {properties.length === 0 ? (<p>No Properties Found</p>) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            properties.map(property => (<div>
                                <PropertyCard key={property._id} property={property}/>
                            </div>))
                        }
                    </div>
                )}
            </div>
        </section>
     );
}
 
export default PropertiesPage;