import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredients } from "@/components/Ingredients";

export default function Recipes() {
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
    const [recipes, setRecipe] = useState<IngredientResponse[]>([])
    const params = useLocalSearchParams<{ ingredientsIds: string }>()

    const ingredientesIds = params.ingredientsIds.split(",")

    useEffect(() => {
        services.ingredients.findByIds(ingredientesIds).then(setIngredients)
    }, [])

    useEffect(() => {
        services.recipes.findByIngredientsIds(ingredientesIds).then(setRecipe)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons
                    name="arrow-back"
                    size={32}
                    onPress={() => router.back()}
                />

                <Text style={styles.title}>Ingredientes</Text>
            </View>

            <Ingredients ingredients={ingredients} />

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Recipe recipe={item} />
                )}
            />
        </View>

    )
}