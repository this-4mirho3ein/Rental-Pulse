import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyEditPage = async ({params}) => {
    await connectDB();
    const PropertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializableObject(PropertyDoc)

    if (!property) {
        return <h1 className="text-center text-2xl font-bold mt-10">
            Property Not Found
        </h1>
    }
    return ( 
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <PropertyEditForm property={property}/>
                </div>
            </div>
        </section>
     );
}
 
export default PropertyEditPage;