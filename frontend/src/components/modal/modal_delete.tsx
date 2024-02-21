import { Button, Modal } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { axios_api_instance } from "../../axios_helpers/axios_api";
import { PostType } from "../../models/model";

type ModalAntdAddBlogProps = {
  setData: Dispatch<SetStateAction<PostType[] | null>>;
  post_id: number;
};

export const ModalAntdDeleteBlog: React.FC<ModalAntdAddBlogProps> = ({
  setData,
  post_id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    (async () => {
      try {
        const response = await axios_api_instance.delete(`posts/${post_id}/`);
        console.log("response:", response);
        setData((prev: PostType[] | null) =>
          prev
            ? prev.filter((post) => post.id !== response.data.id)
            : [response.data]
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} danger type="primary">
        Delete
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
          <Button key="next" danger type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      ></Modal>
    </>
  );
};
