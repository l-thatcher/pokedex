import { TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const searchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-primary rounded-2xl px-5 py-4 border-2 border-secondary shadow-sm shadow-secondary">
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#30c4d5"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};
export default searchBar;
