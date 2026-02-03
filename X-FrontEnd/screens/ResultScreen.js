import { useRoute } from "@react-navigation/native"
import { FlatList, View } from "react-native"
import { CollapseCard } from "../components/CollapseCard";

export const ResultScreen = () => {
    const route = useRoute();
    const { searchResult, llm } = route.params;
    console.log(llm)
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={searchResult}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                renderItem={({ item }) => (
                    <CollapseCard 
                    key={item?.title}
                    title={item?.title} 
                    source={item?.source} 
                    link={item?.link}
                    imageUrl={item?.imageUrl} 
                    />
                )}
            />
        </View>
    )
}