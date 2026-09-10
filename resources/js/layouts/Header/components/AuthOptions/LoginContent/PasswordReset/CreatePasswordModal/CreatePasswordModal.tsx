import type { Dispatch, SetStateAction } from 'react';
import Verified from '@/components/svgs/Verified';
import { Dialog } from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { useTranslation } from '@/hooks/useTranslation';
import type { ActiveModal } from '@/layouts/DefaultLayout';
import StatusModal from '@/pages/Landing/components/StatusModal/StatusModal';
import AuthContent from '../../../components/AuthContent';
import AuthInputField from '../../../components/AuthInputField';
import useAuthFields from '../../../useAuthFields';
import type { CreatePasswordForm } from './useCreatePasswordForm';
import { useCreatePasswordForm } from './useCreatePasswordForm';

type VerifiedUser = {
    id: number;
    email: string;
};

type CreatePasswordModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: VerifiedUser;
    activeModal: ActiveModal;
    setActiveModal: Dispatch<SetStateAction<ActiveModal>>;
};

const CreatePasswordModal = ({
    open,
    onOpenChange,
    user,
    activeModal,
    setActiveModal,
}: CreatePasswordModalProps) => {
    const { t } = useTranslation();

    const { passwordResetFields } = useAuthFields();

    const onSuccess = () => {
        setActiveModal('success');
    };

    const { data, fieldError, handleChange, handleSubmit, processing } =
        useCreatePasswordForm(t, user.email, onSuccess);

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <AuthContent
                    handleSubmit={handleSubmit}
                    buttonText={t('reset_password')}
                    header={t('create_new_password')}
                    subHeader={t('new_password_different')}
                    processing={processing}
                    switchToLogin={() => setActiveModal('login')}
                >
                    <form>
                        <FieldGroup className="gap-0">
                            {passwordResetFields.map(
                                ({ key, htmlFor, ...field }) => (
                                    <AuthInputField
                                        key={htmlFor}
                                        htmlFor={htmlFor}
                                        {...field}
                                        value={
                                            data[
                                                key as keyof CreatePasswordForm
                                            ]
                                        }
                                        onChange={(value) =>
                                            handleChange(
                                                key as Exclude<
                                                    keyof CreatePasswordForm,
                                                    'email'
                                                >,
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            key as keyof CreatePasswordForm,
                                        )}
                                    />
                                ),
                            )}
                        </FieldGroup>
                    </form>
                </AuthContent>
            </Dialog>
            <StatusModal
                header="Success!"
                infotext="Your password changed successfully"
                anchorText="Log in"
                showModal={activeModal === 'success'}
                setShowModal={(show) => setActiveModal(show ? 'success' : null)}
                onAction={() => setActiveModal('login')}
            >
                <Verified />
            </StatusModal>
        </>
    );
};

export default CreatePasswordModal;
