import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const IssuesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
        <BsArrowRight />
      </Button>
    </div>
  );
};

export default IssuesPage;
