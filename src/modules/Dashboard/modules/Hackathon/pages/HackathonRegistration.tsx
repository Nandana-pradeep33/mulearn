import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import styles from "../../../utils/formStyle.module.css";
import {
    FormikTextInput,
    FormikTextInputWhite
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationForm, getHackDetails } from "../services/HackathonApis";
import {
    HackList,
    HackathonApplication
} from "../services/HackathonInterfaces";
import { capitalizeFirstLetter } from "../../../utils/common";
import { HackApplicationSchema } from "../services/HackathonYup";

type Props = {};

const HackathonRegistration = (props: Props) => {
    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<HackList>();
    const [application, setApplication] = useState<HackathonApplication[]>([]);

    useEffect(() => {
        getHackDetails(setData, id);
        getApplicationForm(setApplication, id);
        console.log(application);
    }, []);

    const handleSubmit = (values: { name: string; gender: string; email: string; mobile: string; bio: string; college: string; experience: string; github: string; linkedin: string; }) => {
        console.log(values);
    };

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>
                    Application Form for {data?.title}
                </h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: "",
                        gender: "",
                        email: "",
                        mobile: "",
                        bio: "",
                        college: "",
                        experience: "",
                        github: "",
                        linkedin: ""
                    }}
                    validationSchema={HackApplicationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values)
                    }}
                >
                    {formik => (
                        <Form className={styles.formContainer}>
                            {application &&
                                application.map((hack, index) => (
                                    <div className={styles.inputContainer}>
                                        <FormikTextInputWhite
                                            label={capitalizeFirstLetter(
                                                hack.field_name
                                            )}
                                            name={hack.field_name}
                                            type="text"
                                            placeholder="enter text here..."
                                        />
                                    </div>
                                ))}
                            <div className={styles.inputContainerBtn}>
                                <MuButton
                                    text={"Decline"}
                                    className={styles.btn_cancel}
                                    onClick={() => {
                                        navigate(`/dashboard/hackathon/details/${id}`);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className={styles.btn_submit}
                                >
                                    Confirm
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default HackathonRegistration;
