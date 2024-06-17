import { useState } from 'react';
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function ArtworkForm() {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState(null);

  const initialValues = {
    title: '',
    description: '',
    image: null
  };

  // Define schema for form validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.mixed().required()
  });

  // Handles form submission when adding new artwork
  const handleAddArtwork = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('image', imgFile); // append image file to formData

    // Upload image to Cloudinary
    axios
      .post('http://localhost:4000/api/artworks/upload', formData, {
        withCredentials: true
      })
      .then(upload => {
        // get imager URL and public id from Cloudinary
        const { image: imageUrl, publicId } = upload.data;
        console.log(upload.data);

        // Create a new artwork
        return axios.post(
          'http://localhost:4000/api/artworks',
          {
            title: values.title,
            description: values.description,
            publicId,
            imageUrl
          },
          {
            withCredentials: true
          }
        );
      })
      .then(res => {
        console.log(res);
        navigate('/my-portfolio'); // after new artwork is created, go to the updated portfolio page
      })

      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        // Reset form submission state and its fields
        setSubmitting(false);
        setImgFile(null);
        resetForm();
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddArtwork}>
      {(
        { setFieldValue } // // Destructure necessary formik props from the render prop function (sets the field value directly)
      ) => (
        // set 'encType' data encoding type to be suitable for sending files
        <Form className="form" encType="multipart/form-data">
          <label htmlFor="title">Title:</label>
          <ErrorMessage className="form-error" name="title" component="span" />
          <Field id="title" name="title" placeholder="Image Title" />

          <label htmlFor="description">Describe your art:</label>
          <ErrorMessage
            className="form-error"
            name="description"
            component="span"
          />
          <Field
            id="description"
            name="description"
            placeholder="Image Description"
          />

          <label htmlFor="image">Add Image:</label>
          <ErrorMessage className="form-error" name="image" component="span" />
          <input
            id="image"
            name="image"
            type="file"
            onChange={e => {
              setImgFile(e.currentTarget.files[0]); // set img file
              setFieldValue('image', e.currentTarget.files[0]); // set field value to img file
            }}
          />
          {/* the button will work only if the image file is present */}
          <button className="btn btn-form" type="submit" disabled={!imgFile}>
            Add Artwork
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ArtworkForm;
