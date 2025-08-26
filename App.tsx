import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AuthenticationScreen } from "./src/screens/AuthenticationScreen";
import { ProfileSetupScreen } from "./src/screens/ProfileSetupScreen";
import { MainScreen } from "./src/screens/MainScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "authentication" | "profileSetup" | "main"
  >("welcome");
  const [authenticatedStudentNumber, setAuthenticatedStudentNumber] = useState<
    string | null
  >(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleStartAuthentication = () => {
    setCurrentScreen("authentication");
  };

  const handleAuthenticationComplete = (studentNumber: string) => {
    setAuthenticatedStudentNumber(studentNumber);
    setCurrentScreen("profileSetup");
  };

  const handleProfileComplete = (profile: any) => {
    setUserProfile(profile);
    setCurrentScreen("main");
  };

  const handleBackToWelcome = () => {
    setCurrentScreen("welcome");
    setAuthenticatedStudentNumber(null);
    setUserProfile(null);
  };

  const handleLogout = () => {
    setCurrentScreen("welcome");
    setAuthenticatedStudentNumber(null);
    setUserProfile(null);
  };

  const renderWelcomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.welcomeContent}>
        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.title}>인하대학교 소개팅</Text>
        <Text style={styles.subtitle}>
          안전하고 신뢰할 수 있는 대학캠퍼스 커플
        </Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>강력한 보안 시스템</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>바코드 스캔 인증</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>인하대학교 학생 전용</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💕</Text>
            <Text style={styles.featureText}>스마트 매칭 시스템</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartAuthentication}
        >
          <Text style={styles.startButtonText}>시작하기</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          인하대학교 학생증 바코드 스캔을 통한 본인인증이 필요합니다.
        </Text>
      </View>
    </SafeAreaView>
  );

  if (currentScreen === "authentication") {
    return (
      <AuthenticationScreen
        onAuthenticationComplete={handleAuthenticationComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (currentScreen === "profileSetup") {
    return (
      <ProfileSetupScreen
        studentNumber={authenticatedStudentNumber!}
        onProfileComplete={handleProfileComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (currentScreen === "main") {
    return <MainScreen userProfile={userProfile} onLogout={handleLogout} />;
  }

  return renderWelcomeScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  welcomeContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#212529",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  features: {
    marginBottom: 50,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: "#495057",
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disclaimer: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
  },
});
