import {
  Button,
  Center,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Stack,
} from "@chakra-ui/react";
import { FormEvent } from "react";

interface Props {
  handleSubmit: (event: FormEvent) => void;
  setOtp: (otp: string) => void;
  otp?: string;
}

const RegisterVerifyForm = ({ handleSubmit, setOtp, otp }: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <Center>
            <HStack>
              <PinInput otp onComplete={(value) => setOtp(value)}>
                {[...Array(6)].map((i, index) => (
                  <PinInputField key={index} required />
                ))}
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            marginTop={2}
            disabled={!otp}
            type="submit"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default RegisterVerifyForm;
