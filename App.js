import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';

 const FeedbackSchema = Yup.object().shape({
    subject: Yup.string()
      .required('*Subject is required!')
     .min(2, '*Subject is too Short!')
     .max(80, '*Subject is too Long!'),
    query: Yup.string()
      .required('*Query is required!')
     .min(15, '*Query is too Short!')
     .max(2000, '*Query is too Long!'),
    contact: Yup.string()
    .required('Contact is required')
    .matches(/^[0-9\b]+$/, 'Enter number only')
    .min(10, 'Contact is not less than 10 digit')
    .max(10, 'Contact should not exceed 10 digit'),
    level: Yup.string()
      .required('*Select Level'),
 });

export default function App() {

  const slectLevel = ["Low", "Medium", "High"];

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const selectFile = () => {
    alert("File Selected");
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if(response.didCancel){
        setToastMsg('Cancelled File Select');
      }else if(response.errorCode='permission'){
        setToastMsg('Permission Issue');
      }else if(response.errorCode='others'){
        setToastMsg(response.errorMessage);
      }else{
        alert(response);
      }
    })
  }

  return (
    <Formik
       initialValues={{
         subject: '',
         query: '',
         file: '',
         contact: '',
         level: ''
       }}
       validationSchema={FeedbackSchema}
       onSubmit={values => {Alert.alert(JSON.stringify(values))}}
    >
     {({values, errors, handleChange, isValid, handleSubmit}) => (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.header}>Feedback Form</Text>
          <View style={styles.formContainer}>
            <View  style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Subject" 
                value={values.subject} 
                onChangeText={handleChange('subject')} 
              />
              {errors.subject && (
                <Text style={styles.errText}>{errors.subject}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.inputStyle}
                placeholder="Mention your query" 
                value={values.query} 
                onChangeText={handleChange('query')} 
              />
              {errors.query && (
                <Text style={styles.errText}>{errors.query}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.fileSlect} onPress={selectFile}>
                <Text style={styles.selectTxt}>Choose File</Text>
              </TouchableOpacity>
              <Text style={styles.selecDes}>*. Images should be in JPG format.</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.inputStyle} 
                placeholder="Contact"  
                value={values.contact} 
                onChangeText={handleChange('contact')}
              />
              {errors.contact && (
                <Text style={styles.errText}>{errors.contact}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <SelectList 
                setSelected={handleChange('level')} 
                data={slectLevel}
                placeholder="Select Level"
                boxStyles={{borderColor:'#000', borderWidth: 1, borderRadius: 10, padding: 10, }}
                value={values.level}
                onChangeText={handleChange('level')}
              />
              {errors.level && (
                <Text style={styles.errText}>{errors.level}</Text>
              )}
            </View>
            <TouchableOpacity onPress={handleSubmit} disabled={!isValid} 
              style={[styles.submitBtn, {backgroundColor: isValid ? '#395' : '#f0f0f5'}]}
            >
              <Text style={styles.submitTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EDDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  header:{
    backgroundColor: '#C2C4C5',
    width: '108%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 600,
    marginTop: -330,
    marginBottom: 30,
    paddingTop: 20,
  },
  formContainer: {
    padding: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errText: {
    fontSize: 12,
    color: '#FF0D10',
  },
  submitBtn: {
    width: '40%',
    padding: 10,
    marginTop: 10,
  },
  submitTxt: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  fileSlect: {
    backgroundColor: '#C2C4C5',
    padding: 10,
    borderRadius: 10,
  },
  selectTxt: {
    fontSize: 18,
    textAlign: 'center',
  },
  selecDes: {
    fontSize: 12,
  }
});
