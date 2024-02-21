import { Button, Form, Input, Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { axios_api_instance } from "../../axios_helpers/axios_api";
import { PostType } from "../../models/model";

type ModalEditAntdBlogProps = {
  editData: PostType;
  setData: Dispatch<SetStateAction<PostType[] | null>>;
};

export const ModalEditAntdBlog: React.FC<ModalEditAntdBlogProps> = ({
  editData,
  setData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData && isModalOpen) {
      form.setFieldsValue({ title: editData.title, text: editData.text });
    }
  }, [editData, isModalOpen, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        (async () => {
          try {
            const response = await axios_api_instance.put(
              `posts/${editData.id}/`,
              values
            );
            setData((prev: PostType[] | null) =>
              prev
                ? prev?.map((post: PostType) => {
                    return post.id === response.data.id ? response.data : post;
                  })
                : [response.data]
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
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Data"
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
        <Form
          form={form}
          layout="vertical"
          name={`form_in_modal_edit_${editData.id}`}
        >
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
