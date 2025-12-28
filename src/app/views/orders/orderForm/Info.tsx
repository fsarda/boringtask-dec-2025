import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircleWarningIcon } from "lucide-react";

export const Info = ({ message }: { message: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button size="icon" variant="outline" className="bg-warning">
        <MessageCircleWarningIcon className="" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{message}</p>
    </TooltipContent>
  </Tooltip>
);
