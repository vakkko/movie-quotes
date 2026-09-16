import ErrorPoster404 from '@/components/svgs/ErrorPoster404';
import CustomErrorWrapper from './components/CustomErrorWrapper';

const NotFound = () => {
    return (
        <CustomErrorWrapper
            errorHeading="Whoops!"
            errorText="We can't see the page you are looking for"
        >
            <ErrorPoster404 />
        </CustomErrorWrapper>
    );
};

export default NotFound;
