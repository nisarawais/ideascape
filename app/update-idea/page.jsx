"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditIdea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('id');
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ idea: "", tag: "" });

  useEffect(() => {
    const getIdeaDetails = async () => {
        const response = await fetch(`/api/idea/${ideaId}`)
        const data = await response.json();

        setPost({
            idea: data.idea,
            tag: data.tag,
        })
    }
    if(ideaId) getIdeaDetails();
  }, [ideaId])
  const updateIdea = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!ideaId) return alert ('Idea ID is not found')

    try {
      const response = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          idea: post.idea,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateIdea}
    />
  );
};

export default EditIdea;