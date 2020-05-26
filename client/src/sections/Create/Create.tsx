import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_QUOTE } from '../../lib/graphql/mutations';
import { CreateQuote as CreateQuoteData, CreateQuoteVariables } from '../../lib/graphql/mutations/CreateQuote/__generated__/CreateQuote'; 
import { FormComponentProps } from 'antd/lib/form';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Button, Typography, Form, Input, Radio, Upload } from 'antd';
import { FileTextOutlined, BookOutlined, LoadingOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Viewer } from '../../lib/types';
import { displayErrorMessage, displaySuccessNotification } from '../../lib/utils';
import { QuoteType } from '../../lib/graphql/globalTypes';
import { UploadChangeParam } from 'antd/lib/upload';
interface Props {
  viewer: Viewer;
}

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

const beforeImageUpload = (file: File) => {
  const fileIsValidImage = file.type === "image/jpeg" || file.type === "image/png";
  const fileIsValidSize = file.size / 1024 / 1024 < 1;

  if (!fileIsValidImage) {
    displayErrorMessage("Image uploads must be either JPG or PNG!")
    return false;
  }

  if (!fileIsValidSize) {
    displayErrorMessage("Images must be less than 1MB in size.");
    return false;
  }

  return fileIsValidImage && fileIsValidSize;
}

const getBase64Value = (
  img: File | Blob, 
  callback: (imageBase64Value: string) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    callback(reader.result as string);
  }
}

export const Create = ({ viewer, form }: Props & FormComponentProps) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageBase64Value, setImageBase64Value] = useState<string | null>(null);
  const { getFieldDecorator } = form;

  const [createQuote, { loading, data}] = useMutation<CreateQuoteData, CreateQuoteVariables>(CREATE_QUOTE, {
    onCompleted: () => {
      displaySuccessNotification("We successfully added your quote!");
    },
    onError: () => {
      displayErrorMessage("Sorry, we weren't able to create your quote. Please try again.");
    }
  });

  const handleImageUpload = (info: UploadChangeParam) => {
    const { file } = info;

    if (file.status === "uploading") {
      setImageLoading(true);
    }

    if (file.status === "error") {
      setImageLoading(false);
      displayErrorMessage("failed to upload image.")
    }

    if (file.status === "done" && file.originFileObj) {
      getBase64Value(file.originFileObj, imageBase64Value => {
        setImageBase64Value(imageBase64Value);
        setImageLoading(false);
      });
    }
  }

  const handleCreateQuote = (evt: FormEvent) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        displayErrorMessage("Please complete all form fields");
        return;
      }

      const input = {
        ...values,
        image: imageBase64Value,
      };

      createQuote({
        variables: {
          input
        }
      })
    });
  }
  if (loading) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Please wait!
          </Title>
          <Text type="secondary">We're creating your quote now.</Text>
        </div>
      </Content>
    );
  }

  if (data && data.createQuote) {
    return <Redirect to={`/quote/${data.createQuote.id}`} />;
  }

  if (!viewer.id) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={4} className="host__form-title">
            You'll have to be signed in to create a quote!
          </Title>
          <Text type="secondary">
            We only allow users who've signed in to our application create new quotes. You can sign in at the{" "}
            <Link to="/login">/login</Link> page.
          </Text>
        </div>
      </Content>
    );
  }

  return (
    <Content className="host-content">
      <Form layout="vertical" onSubmit={handleCreateQuote}>
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Hi! Let's get started creating a quote.
          </Title>
          <Text type="secondary">
            In this form, we'll collect the information necessary to create a quote.
          </Text>
        </div>
        <Item label="Type">
          {getFieldDecorator("type", {
            rules: [
              {
                required: true,
                message: "Please select a quote or passage type!"
              }
            ]
          })(
            <Radio.Group>
              <Radio.Button value={QuoteType.PASSAGE}>
                <BookOutlined />{" "}<span>Passage</span>
              </Radio.Button>
              <Radio.Button value={QuoteType.QUOTE}>
                <FileTextOutlined />{" "}<span>Quote</span>
              </Radio.Button>
            </Radio.Group>
        )}
        </Item>
        <Item label="Quote" extra="Max length is 500 characters">
          {getFieldDecorator("quote", {
            rules: [
              {
                required: true,
                message: "Please enter a quote!"
              }
            ]
          })(
            <Input.TextArea 
              rows={3}
              maxLength={500}
              minLength={10} 
              placeholder={`He who is prudent and lies in wait for an enemy who is not, will be victorious.`} 
            />
          )}
        </Item>
        <Item label="Author" extra="Max length is 50 characters">
          {getFieldDecorator("author", {
            rules: [
              {
                required: true,
                message: "Please enter a valid Author!"
              }
            ]
          })(
            <Input placeholder="Sun Tzu" maxLength={50} />
          )}
        </Item>
        <Item label="Period" extra="Please choose an estimated year this quote was first said">
          {getFieldDecorator("period", {
            rules: [
              {
                required: true,
                message: "Please add a time period"
              }
            ]
          })(
            <Input type="number" placeholder="544 BC, 2020, 1900s" maxLength={7}/>
          )}
        </Item>
        <Item label="Category" extra="Please select one category.">
          {getFieldDecorator("category", {
            rules: [
              {
                required: true,
                message: "Please select the most appropriate category!"
              }
            ]
          })(
            <Radio.Group>
              <Radio.Button value="leadership">Leadership</Radio.Button>
              <Radio.Button value="positive">Positive</Radio.Button>
              <Radio.Button value="love">Life/Love</Radio.Button>
              <Radio.Button value="motivation">Motivation</Radio.Button>
            </Radio.Group>
          )}
        </Item>
        <Item 
          label="Image"
          extra="Images must be under 1MB in size and of type JPG or PNG"
        >
          {getFieldDecorator("image", {
            rules: [
              {
                required: true,
                message: "Please upload an image to accompany the quote."
              }
            ]
          })(
            <div className="host__form-image-upload">
              <Upload 
                name="image" 
                listType="picture-card" 
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeImageUpload}
                onChange={handleImageUpload}
              >
                {imageBase64Value ? (
                  <img src={imageBase64Value} alt="accompanying quote" />
                ): (
                  <div>
                    {imageLoading ? <LoadingOutlined /> : <PlusSquareOutlined />}
                    <div className="ant-upload-text">upload</div>
                  </div>
                )}
              </Upload>
            </div>
          )}
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Item>
      </Form>
    </Content>
  )
}

export const wrappedQuote = Form.create<Props & FormComponentProps>({
  name: "quote_form"
})(Create);