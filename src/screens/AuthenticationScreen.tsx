import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { BarcodeScanner } from '../components/BarcodeScanner';
import { AuthenticationStatus } from '../types';
import { maskStudentNumber } from '../utils/barcodeUtils';

interface AuthenticationScreenProps {
  onAuthenticationComplete: (studentNumber: string) => void;
  onBack: () => void;
}

export const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({
  onAuthenticationComplete,
  onBack,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>({
    isAuthenticated: false,
    verificationStep: 'none',
  });

  const handleBarcodeScan = (studentNumber: string) => {
    setAuthStatus({
      isAuthenticated: false,
      studentNumber,
      verificationStep: 'barcode',
    });
    
    // 바코드 스캔 성공 후 다음 단계로 진행
    Alert.alert(
      '바코드 인증 성공!',
      `학번: ${maskStudentNumber(studentNumber)}\n\n다음 단계로 진행하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '다음',
          onPress: () => proceedToNextStep(studentNumber),
        },
      ]
    );
  };

  const handleBarcodeError = (error: string) => {
    Alert.alert('스캔 오류', error);
    setShowScanner(false);
  };

  const proceedToNextStep = (studentNumber: string) => {
    // 여기서 실제로는 대학 이메일 인증이나 추가 검증을 진행
    // 지금은 간단하게 바로 완료 처리
    setAuthStatus({
      isAuthenticated: true,
      studentNumber,
      verificationStep: 'complete',
    });
    
    Alert.alert(
      '인증 완료!',
      '인하대학교 학생 인증이 완료되었습니다.\n\n프로필 설정으로 이동합니다.',
      [
        {
          text: '확인',
          onPress: () => onAuthenticationComplete(studentNumber),
        },
      ]
    );
  };

  const startBarcodeScan = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  if (showScanner) {
    return (
      <BarcodeScanner
        onScan={handleBarcodeScan}
        onError={handleBarcodeError}
        onClose={closeScanner}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>학생 인증</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 메인 콘텐츠 */}
        <View style={styles.content}>
          {/* 인증 단계 표시 */}
          <View style={styles.stepIndicator}>
            <View style={[styles.step, styles.stepActive]}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>바코드 스캔</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={[styles.step, authStatus.verificationStep !== 'none' ? styles.stepActive : styles.stepInactive]}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>이메일 인증</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={[styles.step, authStatus.verificationStep === 'complete' ? styles.stepActive : styles.stepInactive]}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>완료</Text>
            </View>
          </View>

          {/* 인증 설명 */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>
              인하대학교 학생만 사용할 수 있습니다
            </Text>
            <Text style={styles.descriptionText}>
              안전하고 신뢰할 수 있는 소개팅을 위해{'\n'}
              학생증 바코드 스캔을 통한 본인인증이 필요합니다.
            </Text>
          </View>

          {/* 바코드 스캔 버튼 */}
          <TouchableOpacity style={styles.scanButton} onPress={startBarcodeScan}>
            <Text style={styles.scanButtonText}>학생증 바코드 스캔하기</Text>
          </TouchableOpacity>

          {/* 인증 상태 표시 */}
          {authStatus.studentNumber && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusTitle}>인증 진행 상황</Text>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>학번:</Text>
                <Text style={styles.statusValue}>
                  {maskStudentNumber(authStatus.studentNumber)}
                </Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>상태:</Text>
                <Text style={[styles.statusValue, styles.statusSuccess]}>
                  {authStatus.verificationStep === 'complete' ? '인증 완료' : '인증 진행 중'}
                </Text>
              </View>
            </View>
          )}

          {/* 보안 정보 */}
          <View style={styles.securityInfo}>
            <Text style={styles.securityTitle}>🔒 보안 정보</Text>
            <Text style={styles.securityText}>
              • 학생증 바코드로만 학번을 확인합니다{'\n'}
              • 개인정보는 암호화되어 저장됩니다{'\n'}
              • 인증 후에도 언제든지 탈퇴할 수 있습니다
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  backButtonText: {
    fontSize: 20,
    color: '#495057',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  stepActive: {
    opacity: 1,
  },
  stepInactive: {
    opacity: 0.3,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#dee2e6',
    marginHorizontal: 10,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  statusSuccess: {
    color: '#28a745',
  },
  securityInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  securityText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});
