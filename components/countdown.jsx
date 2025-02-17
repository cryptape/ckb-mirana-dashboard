import React, { useState, useEffect } from "react";
import humanizeDuration from "humanize-duration";
import formatThousands from "format-thousands";

function formatNumber(number) {
  return formatThousands(number, { separator: "," });
}

function formatEpochs(number) {
  const intPart = Math.floor(number);
  let remaining = Math.floor((number - intPart) * 10000);
  if (remaining >= 10000) {
    remaining = 9999;
  }

  return `${formatNumber(intPart)}.${remaining}`;
}

function calculateTimeLeft(tip, determinedCalculation) {
  const now = determinedCalculation ? new Date(tip.fetchTime) : new Date();

  const epochsWhenFetch =
    tip.targetEpoch - tip.epochNumber - tip.epochBlockIndex / tip.epochLength;
  const elapsedTime = now - new Date(tip.fetchTime);
  const elapsedEpochs = elapsedTime / tip.estimatedEpochTime;
  const epochs = epochsWhenFetch - elapsedEpochs;
  const milliseconds =
    Math.floor((epochs * tip.estimatedEpochTime) / 1000) * 1000;
  const targetDate = new Date(+now + milliseconds);

  return {
    milliseconds,
    epochs,
    targetDate,
    targetEpoch: tip.targetEpoch,
    useUTCTime: determinedCalculation,
  };
}

function Root({ title, children }) {
  return (
    <div className="my-24 text-center">
      <h1 className="font-bold text-3xl mb-8">{title}</h1>
      {children}
    </div>
  );
}

function Details({
  timeLeft: { targetEpoch, targetDate, epochs, milliseconds, useUTCTime },
}) {
  const targetDateDisplay = useUTCTime
    ? targetDate.toUTCString()
    : targetDate.toLocaleString();

  return (
    <p className="leading-8">
      The Mirana Upgrade epoch {formatNumber(targetEpoch)} is scheduled to occur
      on <strong>{targetDateDisplay}</strong> which is in <br />
      <strong>{humanizeDuration(milliseconds)}</strong>
      <span className="mx-2"> / </span>
      <strong>{formatEpochs(epochs)} epochs</strong> to go
    </p>
  );
}

export default function Countdown(tip) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(tip, true));

  useEffect(() => {
    if (timeLeft.milliseconds > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(tip, false));
      }, 1000);

      return function clearTimer() {
        clearTimeout(timer);
      };
    }
  });

  if (timeLeft.milliseconds > 0) {
    return (
      <Root title="CKB Mirana Upgrade Countdown">
        <Details timeLeft={timeLeft} />
      </Root>
    );
  }

  return <Root title="🎉 🎉 CKB Mirana is now online! 🎉 🎉" />;
}
