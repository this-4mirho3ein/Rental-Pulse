import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/model/Property';
import Pagination from '@/components/Pagination';

const PropertiesPage = async ({searchParams : {page = 1 , pageSize = 9}}) => {
    await connectDB();
    const skip = (page - 1 ) * pageSize;
    const total = await Property.countDocuments({});
    const showPagination = total > pageSize
    const properties = await Property.find({}).skip(skip).limit(pageSize)

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
                {showPagination && (
                    <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total}/>
                )}
            </div>
        </section>
     );
}
 
export default PropertiesPage;