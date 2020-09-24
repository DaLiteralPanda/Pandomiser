module.exports = {
	name: 'randomRange',
	description: 'Generates Random Numbers',
	execute(message, args) {
  const gs = message.content.replace(`${prefix}randomRange`, "").split(" ").slice(1);

    if(gs[0]) {
      let min, max;

	  // There is only one argument
      if(!gs[1]) {
        min = 0;
        max = Number(gs[0]);
      }
	  // Two arguments
      else {
        min = Number(gs[0]);
        max = Number(gs[1]);

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
