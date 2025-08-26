import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface BarcodeScannerProps {
  onScan: (studentNumber: string) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  onError,
  onClose,
}) => {
  // 임시로 테스트용 학번 생성
  const handleTestScan = () => {
    const testStudentNumber = "2020123456"; // 테스트용 학번
    onScan(testStudentNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>바코드 스캔 (테스트 모드)</Text>
        <Text style={styles.description}>
          실제 바코드 스캔 기능은 개발 중입니다.{"\n"}
          지금은 테스트용 학번으로 진행할 수 있습니다.
        </Text>

        <TouchableOpacity style={styles.testButton} onPress={handleTestScan}>
          <Text style={styles.testButtonText}>테스트 학번으로 진행</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 50,
  },
  testButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  testButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#666",
  },
  closeButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
