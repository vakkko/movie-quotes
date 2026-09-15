import ErrorPoster403 from '@/components/svgs/ErrorPoster403';
import CustomErrorWrapper from './components/CustomErrorWrapper';

const Forbidden = () => {
    return (
        <CustomErrorWrapper
            errorHeading="You shall not pass!"
            errorText="Sorry, but  you don’t have permission to access this page"
        >
            <ErrorPoster403 />
        </CustomErrorWrapper>
    );
};

export default Forbidden;
