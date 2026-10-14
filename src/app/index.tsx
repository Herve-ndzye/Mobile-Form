import * as DocumentPicker from 'expo-document-picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

export default function BasicFormScreen() {
  const theme = useTheme();

  // Basic Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    date: '',
    gender: 'Male',
    role: 'Student',
    agree: false,
    bio: '',
    image: null as string | null,
    fileName: null as string | null,
  });

  // Pick Image
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setFormData((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  // Pick File
  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });

    if (!result.canceled && result.assets.length > 0) {
      setFormData((prev) => ({ ...prev, fileName: result.assets[0].name }));
    }
  };

  // Submit & Console Data
  const handleSubmit = () => {
    console.log('====================================');
    console.log('FORM SUBMITTED DATA:');
    console.log(formData);
    console.log('====================================');

    if (Platform.OS === 'web') {
      window.alert('Form submitted! Data logged to browser console / terminal.');
    } else {
      Alert.alert('Form Submitted', 'Data has been logged to the console/terminal.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <ThemedView style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="subtitle" style={styles.title}>
            Simple Form
          </ThemedText>
          <ThemedText style={styles.subtitle} themeColor="textSecondary">
            Fill the inputs and click submit to view data in console
          </ThemedText>

          {/* Text Input: Name */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.backgroundSelected, color: theme.text }]}
              placeholder="Enter your name"
              placeholderTextColor={theme.textSecondary}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          {/* Email Input */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.backgroundSelected, color: theme.text }]}
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          {/* Password Input */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.backgroundSelected, color: theme.text }]}
              placeholder="Enter password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
          </View>

          {/* Number Inputs: Phone & Age */}
          <View style={styles.row}>
            <View style={[styles.field, { flex: 2 }]}>
              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <TextInput
                style={[styles.input, { borderColor: theme.backgroundSelected, color: theme.text }]}
                placeholder="Phone number"
                placeholderTextColor={theme.textSecondary}
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <ThemedText style={styles.label}>Age</ThemedText>
              <TextInput
                style={[styles.input, { borderColor: theme.backgroundSelected, color: theme.text }]}
                placeholder="Age"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
              />
            </View>
          </View>

          {/* Date Input */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Date</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.backgroundSelected, color: theme.text }]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={theme.textSecondary}
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
            />
          </View>

          {/* Radio Buttons: Gender */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Gender</ThemedText>
            <View style={styles.radioRow}>
              {['Male', 'Female', 'Other'].map((option) => (
                <Pressable
                  key={option}
                  style={styles.radioItem}
                  onPress={() => setFormData({ ...formData, gender: option })}>
                  <View
                    style={[
                      styles.radioCircle,
                      { borderColor: formData.gender === option ? '#2563EB' : theme.textSecondary },
                    ]}>
                    {formData.gender === option && <View style={styles.radioDot} />}
                  </View>
                  <ThemedText style={styles.radioText}>{option}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Role Select Buttons */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Role</ThemedText>
            <View style={styles.roleRow}>
              {['Student', 'Teacher', 'Developer'].map((r) => (
                <Pressable
                  key={r}
                  style={[
                    styles.roleChip,
                    formData.role === r && styles.roleChipActive,
                    { borderColor: theme.backgroundSelected },
                  ]}
                  onPress={() => setFormData({ ...formData, role: r })}>
                  <ThemedText
                    style={[
                      styles.roleChipText,
                      formData.role === r && styles.roleChipTextActive,
                    ]}>
                    {r}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Image Upload Input */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Image Upload</ThemedText>
            <Pressable style={styles.uploadBtn} onPress={handlePickImage}>
              <ThemedText style={styles.uploadBtnText}>📷 Choose Image</ThemedText>
            </Pressable>
            {formData.image && (
              <View style={styles.previewRow}>
                <Image source={{ uri: formData.image }} style={styles.previewImage} />
                <Pressable onPress={() => setFormData({ ...formData, image: null })}>
                  <ThemedText style={styles.removeText}>Remove</ThemedText>
                </Pressable>
              </View>
            )}
          </View>

          {/* File Upload Input */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>File Upload</ThemedText>
            <Pressable style={styles.uploadBtn} onPress={handlePickFile}>
              <ThemedText style={styles.uploadBtnText}>📁 Choose File</ThemedText>
            </Pressable>
            {formData.fileName && (
              <View style={styles.previewRow}>
                <ThemedText style={styles.fileNameText}>Selected: {formData.fileName}</ThemedText>
                <Pressable onPress={() => setFormData({ ...formData, fileName: null })}>
                  <ThemedText style={styles.removeText}>Remove</ThemedText>
                </Pressable>
              </View>
            )}
          </View>

          {/* Textarea: Bio / Notes */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Bio / Notes</ThemedText>
            <TextInput
              style={[
                styles.textarea,
                { borderColor: theme.backgroundSelected, color: theme.text },
              ]}
              placeholder="Write something..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={3}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
            />
          </View>

          {/* Switch: Terms */}
          <View style={styles.switchRow}>
            <ThemedText style={styles.label}>Agree to Terms</ThemedText>
            <Switch
              value={formData.agree}
              onValueChange={(val) => setFormData({ ...formData, agree: val })}
              trackColor={{ false: theme.backgroundSelected, true: '#2563EB' }}
            />
          </View>

          {/* Submit Button */}
          <Pressable style={styles.submitBtn} onPress={handleSubmit}>
            <ThemedText style={styles.submitBtnText}>Submit Data</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: -8,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  textarea: {
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  radioRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  radioText: {
    fontSize: 14,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  roleChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  roleChipText: {
    fontSize: 13,
  },
  roleChipTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  uploadBtn: {
    backgroundColor: '#2563EB15',
    borderWidth: 1,
    borderColor: '#2563EB50',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  fileNameText: {
    fontSize: 13,
    flex: 1,
  },
  removeText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
