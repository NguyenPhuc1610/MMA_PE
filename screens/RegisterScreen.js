import React, { useReducer, useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUp } from "../utils/actions/authActions";
import { reducer } from "../utils/reducers/formReducers";
import { validateInput } from "../utils/actions/formActions";

const initialState = {
  inputValues: {
    fullName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const RegisterScreen = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const handleRegister = async () => {
    const { fullName, email, password } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try{
      
      await dispatch(signUp(fullName, email, password));
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("LoginScreen");
    }catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formState.inputValues.fullName}
        onChangeText={(text) => inputChangedHandler("fullName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formState.inputValues.email}
        onChangeText={(text) => inputChangedHandler("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formState.inputValues.password}
        onChangeText={(text) => inputChangedHandler("password", text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafc",
    paddingHorizontal: 20,
    paddingTop: 60,  
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "700",
    color: "#333",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#000",  
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",  // White text color
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  loginButton: {
    marginTop: 25,
  },
  loginText: {
    color: "#0056b3",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
