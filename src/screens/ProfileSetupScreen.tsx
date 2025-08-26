import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

interface ProfileSetupScreenProps {
  studentNumber: string;
  onProfileComplete: (profile: any) => void;
  onBack: () => void;
}

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  studentNumber,
  onProfileComplete,
  onBack,
}) => {
  const [profile, setProfile] = useState({
    name: '',
    major: '',
    grade: '',
    bio: '',
    interests: '',
    phoneNumber: '',
  });

  const handleSave = () => {
    if (!profile.name || !profile.major || !profile.grade) {
      Alert.alert('필수 정보 입력', '이름, 학과, 학년은 필수로 입력해주세요.');
      return;
    }

    const completeProfile = {
      ...profile,
      studentNumber,
      grade: parseInt(profile.grade),
      interests: profile.interests.split(',').map(item => item.trim()).filter(item => item),
    };

    onProfileComplete(completeProfile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>프로필 설정</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 메인 콘텐츠 */}
        <View style={styles.content}>
          <Text style={styles.title}>프로필을 완성해주세요!</Text>
          <Text style={styles.subtitle}>
            다른 학생들과 매칭되기 위한 정보를 입력해주세요.
          </Text>

          {/* 학번 정보 */}
          <View style={styles.studentInfo}>
            <Text style={styles.label}>학번</Text>
            <Text style={styles.studentNumber}>{studentNumber}</Text>
          </View>

          {/* 이름 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>이름 *</Text>
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              placeholder="이름을 입력하세요"
              placeholderTextColor="#999"
            />
          </View>

          {/* 학과 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>학과 *</Text>
            <TextInput
              style={styles.input}
              value={profile.major}
              onChangeText={(text) => setProfile({ ...profile, major: text })}
              placeholder="학과를 입력하세요 (예: 컴퓨터공학과)"
              placeholderTextColor="#999"
            />
          </View>

          {/* 학년 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>학년 *</Text>
            <TextInput
              style={styles.input}
              value={profile.grade}
              onChangeText={(text) => setProfile({ ...profile, grade: text })}
              placeholder="학년을 입력하세요 (1-6)"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* 자기소개 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>자기소개</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={profile.bio}
              onChangeText={(text) => setProfile({ ...profile, bio: text })}
              placeholder="자기소개를 입력하세요..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* 관심사 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>관심사</Text>
            <TextInput
              style={styles.input}
              value={profile.interests}
              onChangeText={(text) => setProfile({ ...profile, interests: text })}
              placeholder="관심사를 쉼표로 구분하여 입력 (예: 음악, 영화, 여행)"
              placeholderTextColor="#999"
            />
          </View>

          {/* 휴대폰 번호 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>휴대폰 번호</Text>
            <TextInput
              style={styles.input}
              value={profile.phoneNumber}
              onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
              placeholder="휴대폰 번호를 입력하세요"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>프로필 저장하기</Text>
          </TouchableOpacity>

          {/* 안내 메시지 */}
          <Text style={styles.note}>
            * 표시된 항목은 필수 입력 사항입니다.
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  studentInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  studentNumber: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212529',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
