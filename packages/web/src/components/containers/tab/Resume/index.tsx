import Button from '@/components/Button';
import ButtonText from '@/components/ButtonText';
import EmptyList from '@/components/EmptyList';
import { Input } from '@/components/Input';
import Modal from '@/components/Modal';
import Paper from '@/components/Paper/page';
import { Title } from '@/components/containers/tab/Resume/styled';
import { useListCandidateResume } from '@/hooks/api/listResume';
import { useUpdateResumeTitle } from '@/hooks/api/updateResumeTitle';
import { useUploadResume } from '@/hooks/api/uploadResume';
import { getDocumentUrl } from '@/utils/assest';
import { blue } from '@/utils/color';
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  DocumentTextIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { EyeIcon, PlusSmallIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ResumesTab() {
  const router = useRouter();
  const { mutate: updateTitle } = useUpdateResumeTitle();
  const { data: candidateResume, refetch: refetchCandidateResume } =
    useListCandidateResume();
  const {
    data: candidateSelfCreatedResume,
    refetch: refetchCandidateSelfCreatedResume,
  } = useListCandidateResume(true);

  const { mutate: uploadResume } = useUploadResume();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [editingResumeId, setEditingResumeId] = useState<number | null>(null);
  const [editingResumeTitle, setEditingResumeTitle] = useState<string>('');

  const handleCreateNewResume = () => {
    router.push('/resume/create');
  };

  const handleUploadResume = () => {
    inputFileRef.current?.click();
  };

  const handleUploadResumeChange = (event: any) => {
    const form = new FormData();
    form.append('resume', event.target.files[0]);
    form.append('title', event.target.files[0].name);

    uploadResume(form, {
      onSuccess: () => {
        toast.success('Upload resume successfully');
      },
      onSettled: () => {
        refetchCandidateSelfCreatedResume();
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Title>Resume created</Title>
          <Button onClick={handleCreateNewResume}>
            <Box display="flex" alignItems="center" gap={1}>
              <PlusSmallIcon width={18} height={18} />
              Create new
            </Box>
          </Button>
        </Box>
        <Box minHeight={350}>
          {candidateResume?.length > 0 ? (
            candidateResume.map((resume: any) => (
              <Box
                minHeight={72}
                key={resume.id}
                display="flex"
                alignItems="center"
                mb={1}
                gap={2}
                padding={2}
                boxShadow="0px 0px 5px 0px rgba(0,0,0,0.15)"
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  ':hover': {
                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
                  },
                }}
                borderRadius={1}
              >
                <DocumentTextIcon width={30} height={30} />
                {editingResumeId === resume.id ? (
                  <>
                    <Input
                      placeholder="Edit resume title"
                      defaultValue={resume.title}
                      onChange={(e) => {
                        setEditingResumeTitle(e.target.value);
                      }}
                    />

                    <ButtonText
                      onClick={() => {
                        setEditingResumeId(null);
                        updateTitle(
                          {
                            title: editingResumeTitle,
                            id: resume.id,
                          },
                          {
                            onSuccess: () => {
                              toast.success('Update resume successfully');
                            },
                            onSettled: () => {
                              refetchCandidateResume();
                            },
                          },
                        );
                      }}
                    >
                      <CheckIcon
                        style={{ marginTop: 3 }}
                        width={20}
                        height={20}
                        color={blue[500]}
                      />
                    </ButtonText>
                  </>
                ) : (
                  <Box mr="auto">{resume.title}</Box>
                )}
                {editingResumeId !== resume.id && (
                  <>
                    <Modal
                      noPadding
                      trigger={
                        <ButtonText>
                          <EyeIcon
                            width={20}
                            height={20}
                            style={{ marginTop: 3 }}
                          />
                        </ButtonText>
                      }
                    >
                      <embed
                        src={getDocumentUrl(resume.path)}
                        width="900px"
                        height="800px"
                        style={{
                          maxHeight: '100vh',
                        }}
                        type="application/pdf"
                      />
                    </Modal>
                    <ButtonText
                      onClick={() => {
                        setEditingResumeId(resume.id);
                        setEditingResumeTitle(resume.title);
                      }}
                    >
                      <PencilIcon
                        width={20}
                        height={20}
                        style={{ marginTop: 3 }}
                      />
                    </ButtonText>
                  </>
                )}
              </Box>
            ))
          ) : (
            <EmptyList />
          )}
        </Box>
      </Paper>

      <Paper>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Title>Resume uploaded</Title>
          <Button onClick={handleUploadResume}>
            <Box display="flex" alignItems="center" gap={1}>
              <ArrowUpOnSquareIcon width={18} height={18} />
              Upload your resume (PDF)
            </Box>
          </Button>
          <input
            ref={inputFileRef}
            onChange={handleUploadResumeChange}
            type="file"
            hidden
            accept="application/pdf"
          />
        </Box>
        <Box minHeight={350}>
          {candidateSelfCreatedResume?.length > 0 ? (
            candidateSelfCreatedResume.map((resume: any) => (
              <Box
                key={resume.id}
                minHeight={72}
                display="flex"
                alignItems="center"
                gap={2}
                padding={2}
                mb={1}
                boxShadow="0px 0px 5px 0px rgba(0,0,0,0.15)"
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  ':hover': {
                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
                  },
                }}
                borderRadius={1}
              >
                <DocumentTextIcon width={30} height={30} />
                {editingResumeId === resume.id ? (
                  <>
                    <Input
                      placeholder="Edit resume title"
                      defaultValue={resume.title}
                      onChange={(e) => {
                        setEditingResumeTitle(e.target.value);
                      }}
                    />

                    <ButtonText
                      onClick={() => {
                        setEditingResumeId(null);
                        updateTitle(
                          {
                            title: editingResumeTitle,
                            id: resume.id,
                          },
                          {
                            onSuccess: () => {
                              toast.success('Update resume successfully');
                            },
                            onSettled: () => {
                              refetchCandidateSelfCreatedResume();
                            },
                          },
                        );
                      }}
                    >
                      <CheckIcon
                        style={{ marginTop: 3 }}
                        width={20}
                        height={20}
                        color={blue[500]}
                      />
                    </ButtonText>
                  </>
                ) : (
                  <Box mr="auto">{resume.title}</Box>
                )}
                {editingResumeId !== resume.id && (
                  <>
                    <Modal
                      noPadding
                      trigger={
                        <ButtonText>
                          <EyeIcon
                            width={20}
                            height={20}
                            style={{ marginTop: 3 }}
                          />
                        </ButtonText>
                      }
                    >
                      <embed
                        src={getDocumentUrl(resume.path)}
                        width="900px"
                        height="800px"
                        style={{
                          maxHeight: '100vh',
                        }}
                        type="application/pdf"
                      />
                    </Modal>
                    <ButtonText
                      onClick={() => {
                        setEditingResumeId(resume.id);
                        setEditingResumeTitle(resume.title);
                      }}
                    >
                      <PencilIcon
                        width={20}
                        height={20}
                        style={{ marginTop: 3 }}
                      />
                    </ButtonText>
                  </>
                )}
              </Box>
            ))
          ) : (
            <EmptyList />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
