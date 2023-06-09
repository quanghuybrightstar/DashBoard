/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Form, Input, Button, Select, message, Modal } from 'antd';
import { useApi } from '@/src/api/useApi';
import styles from './styles.module.scss';
import FormComponent from '@/src/components/Form';
import { useRouter } from 'next/router';

const { Option } = Select;
const { TextArea } = Input;

const UpdateProductContainer: React.FC<{ props: any }> = ({ props }) => {
  const productID: string = props;
  const $api = useApi();
  const router = useRouter();
  const [modalText, setModalText] = useState<string>(
    'Bạn chắc chắn muốn sửa sản phẩm này?'
  );
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [bodyUpdateProduct, setBodyUpdateProduct] = useState();
  //Form
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    values.price = parseInt(values.price);
    setBodyUpdateProduct(values);
    form.setFieldsValue(values);
    console.log(form.getFieldsValue());
    showModal();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleClickBack = () => {
    router.back();
  };

  //Func Modal
  const showModal = () => {
    setIsOpenConfirmModal(true);
  };

  const handleOK = async () => {
    setModalText('Đang xác nhận...');
    let success = await $api.updateProduct(bodyUpdateProduct, productID);
    if (success) {
      setIsOpenConfirmModal(false);
      setConfirmLoading(false);
      setModalText('Bạn chắc chắn muốn sửa sản phẩm này?');
      message.success(`Sửa thành công sản phẩm!`);
      router.back();
    } else {
      setModalText('Sửa sản phẩm thất bại!');
      message.error(`Sửa thất bại sản phẩm`);
    }
  };

  const handleCancel = () => {
    setIsOpenConfirmModal(false);
  };

  //Product By ID
  const [productById, setProductById] = useState<any>();

  const getProduct = async () => {
    const data: any = await $api.getProductById(productID);
    setProductById(data);
    form.setFieldsValue(data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  //Get category data
  const [dataCategory, setDataCategory] = useState<string[]>([]);

  const getCategory = async () => {
    const data: any = await $api.getCategories();
    setDataCategory(data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className={styles.updateProduct_container}>
      <Button className="btn_add_left" onClick={handleClickBack}>
        Quay lại
      </Button>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={styles.form_container}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input placeholder="Tên sản phẩm ..."></Input>
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <Input type="number" placeholder="Giá ..."></Input>
        </Form.Item>

        <Form.Item
          label="Thể loại"
          name="category"
          rules={[
            { required: true, message: 'Vui lòng nhập thể loại sản phẩm!' },
          ]}
        >
          <Select placeholder="Thể loại ...">
            {dataCategory?.map((category: string) => (
              <Option value={category} key={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
        >
          <TextArea placeholder="Mô tả ..."></TextArea>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          className={styles.btn_submit_form}
        >
          <Button type="primary" htmlType="submit">
            Sửa sản phẩm
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Sửa sản phẩm"
        open={isOpenConfirmModal}
        onOk={handleOK}
        cancelText={'Hủy'}
        okText={'Xác nhận'}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered={true}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default UpdateProductContainer;
