import React, { useReducer, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { authenticate } from "../store/authSlice";
import { reducer } from "../utils/reducers/formReducers";
import { validateInput } from "../utils/actions/formActions";

const initialState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const validationResult = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  const handleLogin = async () => {
    const { email, password } = formState.inputValues;

    // Kiểm tra các trường trống và tính hợp lệ
    if (!formState.formIsValid) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const auth = getAuth(getFirebaseApp());
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = result.user;
      const { accessToken } = stsTokenManager;

      // Lưu thông tin đăng nhập vào Redux
      dispatch(authenticate({ token: accessToken, userData: { uid, email } }));
      Alert.alert("Login Successful");
      navigation.navigate("Main");
    } catch (error) {
      // Xử lý lỗi nếu đăng nhập không thành công
      let message = "An error occurred during login";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        message = "Invalid email or password";
      }
      Alert.alert("Login Failed", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafc",
    paddingHorizontal: 20,
    paddingTop: 60, // Pushes the form higher on the screen
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
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  registerButton: {
    marginTop: 25,
  },
  registerText: {
    color: "#0056b3",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});