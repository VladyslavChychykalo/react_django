import { Button, Form, Input, Modal } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { axios_api_instance } from "../../axios_helpers/axios_api";
import { PostType } from "../../models/model";

type ModalAntdAddBlogProps = {
  setData: Dispatch<SetStateAction<PostType[] | null>>;
};

export const ModalAntdAddBlog: React.FC<ModalAntdAddBlogProps> = ({
  setData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        (async () => {
          try {
            const response = await axios_api_instance.post("posts/", values);
            console.log("response:", response.data);
            setData((prev: PostType[] | null) =>
              prev ? [...prev, response.data] : [response.data]
            );
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        })();
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} className="green-btn">
        Add Post
      </Button>
      <Modal
        title="Add blog post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="form_in_modal_add">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="text"
            label="Text"
            rules={[{ required: true, message: "Please input the text!" }]}
          >
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
