import { Button, TextInput, Notification } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { sendEmail } from "../../Services/UserService";

const Subscribe = () => {
    const matches = useMediaQuery('(max-width: 639px)');
    const matches1 = useMediaQuery('(max-width: 475px)');
    
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubscribe = async () => {
        if (!email) {
            setError("Please enter a valid email.");
            return;
        }
        setLoading(true);
        try {
            await sendEmail(email);  // Assuming sendEmail is a function that accepts email as an argument
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError("There was an issue with sending the email. Please try again.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div data-aos="zoom-out" className="mt-20 flex items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5 py-3 rounded-xl justify-around flex-wrap">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 text-center font-semibold text-mine-shaft-100">
                Be the First to Know About <span className="text-bright-sun-400">New Jobs!</span>
            </div>
            <div className="flex gap-4 rounded-xl xs-mx:flex-col bg-mine-shaft-700 px-3 py-2 xs:items-center">
                <TextInput
                    className=" [&_input]:text-mine-shaft-100 font-semibold"
                    variant="unstyled"
                    placeholder="Your@email.com"
                    size={matches1 ? "sm" : matches ? "md" : "xl"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    className="!rounded-lg"
                    size={matches1 ? "sm" : matches ? "md" : "xl"}
                    color="brightSun.4"
                    variant="filled"
                    loading={loading}
                    onClick={handleSubscribe}
                >
                    Subscribe
                </Button>
            </div>

            {/* Display error or success notification */}
            {error && <Notification color="red" onClose={() => setError(null)}>{error}</Notification>}
            {success && <Notification color="green" onClose={() => setSuccess(false)}>Subscription successful! Check your email.</Notification>}
        </div>
    );
};

export default Subscribe;
