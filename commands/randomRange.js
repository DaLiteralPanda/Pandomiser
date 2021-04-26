const prefix = "p!";
module.exports = {
	name: 'randomRange',
	description: 'Generates Random Numbers',
	execute(message, args) {
  const nums = message.content.replace(`${prefix}randomRange`, "").split(" ").slice(1);

    if(nums[0]) {
      let min, max;

	  // There is only one argument
      if(!nums[1]) {
        min = 0;
        max = Number(nums[0]);
      }
	  // Two arguments
      else {
        min = Number(nums[0]);
        max = Number(nums[1]);

        // Minimum is actually maximum, so swap
        if(min > max) {
          max = min;
          min = 0;
	    }
      }

      const num = Math.floor(Math.random() * (max - min)) + min;
      message.channel.send(num);
    }
	},
};
