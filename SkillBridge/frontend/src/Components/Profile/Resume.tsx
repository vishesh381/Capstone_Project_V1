import { FileInput, Text, Button, Stack } from "@mantine/core";
import { IconUpload, IconEye } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../Services/Utilities";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useState } from "react";

const Resume = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleResumeChange = async (file: File | null) => {
    if (!file) return;

    const base64: any = await getBase64(file);
    const resumeBase64 = base64.split(",")[1];

    const updatedProfile = { ...profile, resume: resumeBase64 };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Resume uploaded successfully");

    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
  };

  const handleViewResume = () => {
    if (profile.resume) {
      const resumeBlob = new Blob(
        [Uint8Array.from(atob(profile.resume), (c) => c.charCodeAt(0))],
        { type: "application/pdf" }
      );
      const url = URL.createObjectURL(resumeBlob);
      window.open(url, "_blank");
    }
  };

  return (
    <Stack gap="xs" className="mb-5">
      <Text size="xl" fw={600}>
        Resume
      </Text>

      <FileInput
        placeholder="Upload Resume"
        accept=".pdf,.doc,.docx"
        leftSection={<IconUpload size={16} />}
        onChange={handleResumeChange}
      />

      {profile.resume && (
        <Button
          leftSection={<IconEye size={18} />}
          variant="light"
          color="blue"
          onClick={handleViewResume}
        >
          View Uploaded Resume
        </Button>
      )}
    </Stack>
  );
};

export default Resume;
