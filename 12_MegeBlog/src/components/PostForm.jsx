import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../components";
import { dbService } from '../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata);

    const submit = async (data) => {
        console.log("[PostForm] submit raw form data:", data);
        console.log("[PostForm] current userData:", userData);
        console.log("[PostForm] current post:", post);
        
        if (post) {
            console.log("[PostForm] updating existing post");
            const file = data.image?.[0] ? await dbService.uploadFile(data.image[0]) : null;
            console.log("[PostForm] uploaded replacement file:", file);

            if (file) {
                console.log("[PostForm] deleting old file:", post.featuredImage);
                dbService.deleteFile(post.featuredImage);
            }

            const payload = {
                ...data,
                featuredImage: file ? file.$id : undefined,
            };

            console.log("[PostForm] update payload:", payload);

            const dbPost = await dbService.updatePost(post.$id, payload);
            console.log("[PostForm] update response:", dbPost);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        else {
            console.log("[PostForm] creating new post");
            console.log("[PostForm] title/content/status/slug before upload:", {
                title: data.title,
                content: data.content,
                status: data.status,
                slug: data.slug,
            });

            const file = await dbService.uploadFile(data.image?.[0]);
            console.log("[PostForm] uploaded file:", file);

            if (file) {
                console.log("[PostForm] creating post with file ID:", file.$id);
                console.log("[PostForm] current userData:", userData);
                console.log("[PostForm] form data before payload:", data);
                // console.log("[PostForm] form data after payload:", {
                //     ...data,
                //     featuredImage: file.$id,
                //     userId: userData.$id,
                // });
                const fileId = file.$id;
                const payload = { ...data, featuredImage: fileId, userId: userData.$id };

                console.log("[PostForm] create payload:", payload);

                const dbPost = await dbService.createPost(payload);
                console.log("[PostForm] create response:", dbPost);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                console.error("[PostForm] file upload failed; post was not created");
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    value={getValues("status")}
                    className="mb-4"
                    {...register("status", {  })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
