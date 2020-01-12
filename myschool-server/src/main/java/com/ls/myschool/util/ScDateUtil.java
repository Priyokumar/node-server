package com.ls.myschool.util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class ScDateUtil {

	public static final String DATE_FORMAT = "dd-MM-yyyy";
	public static final String DATE_TIME_FORMAT = "dd-MM-yyyy  HH:mm:ss";
	public static final String TIME_FORMAT = "HH:mm:ss";
	public static final String DATE_FORMAT_MONTH_FIRST = "MM/dd/yyyy";

	private static final ZoneId DEFAULT_ZONE_ID = ZoneId.systemDefault();

	public static String dateToString(Date date) {
		return dateToString(date, DATE_FORMAT_MONTH_FIRST);
	}

	public static Date stringToDate(String dateStr) {
		return stringToDate(dateStr, DATE_FORMAT_MONTH_FIRST);
	}

	public static String dateToString(Date date, String format) {

		if (!ScUtil.isAllPresent(date))
			return null;

		if (!ScUtil.isAllPresent(format))
			format = DATE_FORMAT_MONTH_FIRST;

		String dateStr = null;
		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern(format);
		try {
			LocalDate localDate = date.toInstant().atZone(DEFAULT_ZONE_ID).toLocalDate();
			dateStr = dateFormatter.format(localDate);
		} catch (Exception e) {
		}
		return dateStr;
	}

	public static Date stringToDate(String dateStr, String format) {

		if (!ScUtil.isAllPresent(dateStr))
			return null;

		if (!ScUtil.isAllPresent(format))
			format = DATE_FORMAT_MONTH_FIRST;

		Date date = null;
		try {
			DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern(format);
			LocalDate localDate = LocalDate.parse(dateStr, dateFormat);
			date = Date.from(localDate.atStartOfDay(DEFAULT_ZONE_ID).toInstant());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date;
	}

	public static Date now() {
		return Date.from(LocalDate.now().atStartOfDay(DEFAULT_ZONE_ID).toInstant());
	}

}
